import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { apiService } from '@/services/api';

interface Recipe {
  id: string;
  name: string;
  ingredients: string;
  instructions: string;
  created_at?: string;
}

interface SavedRecipesContextType {
  savedRecipes: Recipe[];
  loading: boolean;
  isPremium: boolean;
  saveRecipe: (recipe: Omit<Recipe, 'id' | 'created_at'>) => Promise<void>;
  deleteRecipe: (recipeId: string) => Promise<void>;
  isRecipeSaved: (recipeId: string) => boolean;
  clearLocalData: () => void;
}

const SavedRecipesContext = createContext<SavedRecipesContextType | undefined>(undefined);

export const SavedRecipesProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const isPremium = user?.is_premium || false;

  // Load recipes on authentication change
  useEffect(() => {
    const loadRecipes = async () => {
      if (!isAuthenticated) {
        setSavedRecipes([]);
        return;
      }

      if (isPremium) {
        // Premium users: load from database
        try {
          setLoading(true);
          const recipes = await apiService.getRecipes();
          setSavedRecipes(recipes.map(r => ({ ...r, id: r._id })));
        } catch (error) {
          console.error('Failed to load recipes:', error);
        } finally {
          setLoading(false);
        }
      } else {
        // Free users: load from localStorage
        const saved = localStorage.getItem(`savedRecipes_${user?.id}`);
        setSavedRecipes(saved ? JSON.parse(saved) : []);
      }
    };

    loadRecipes();
  }, [isAuthenticated, isPremium, user?.id]);

  // Save to localStorage for free users
  useEffect(() => {
    if (isAuthenticated && !isPremium && user?.id) {
      localStorage.setItem(`savedRecipes_${user.id}`, JSON.stringify(savedRecipes));
    }
  }, [savedRecipes, isAuthenticated, isPremium, user?.id]);

  const saveRecipe = async (recipe: Omit<Recipe, 'id' | 'created_at'>) => {
    if (isPremium) {
      // Premium users: save to database
      try {
        const savedRecipe = await apiService.saveRecipe(recipe.name, recipe.ingredients, recipe.instructions);
        setSavedRecipes(prev => [...prev, { ...savedRecipe, id: savedRecipe._id }]);
      } catch (error) {
        throw error;
      }
    } else {
      // Free users: save to localStorage
      const newRecipe: Recipe = {
        ...recipe,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };
      setSavedRecipes(prev => [...prev, newRecipe]);
    }
  };

  const deleteRecipe = async (recipeId: string) => {
    if (isPremium) {
      // Premium users: delete from database
      try {
        await apiService.deleteRecipe(recipeId);
        setSavedRecipes(prev => prev.filter(r => r.id !== recipeId));
      } catch (error) {
        throw error;
      }
    } else {
      // Free users: delete from localStorage
      setSavedRecipes(prev => prev.filter(r => r.id !== recipeId));
    }
  };

  const isRecipeSaved = (recipeId: string) => {
    return savedRecipes.some(r => r.id === recipeId);
  };

  const clearLocalData = () => {
    if (user?.id) {
      localStorage.removeItem(`savedRecipes_${user.id}`);
    }
    setSavedRecipes([]);
  };

  return (
    <SavedRecipesContext.Provider value={{ 
      savedRecipes,
      loading,
      isPremium,
      saveRecipe, 
      deleteRecipe, 
      isRecipeSaved,
      clearLocalData
    }}>
      {children}
    </SavedRecipesContext.Provider>
  );
};

export const useSavedRecipes = () => {
  const context = useContext(SavedRecipesContext);
  if (context === undefined) {
    throw new Error('useSavedRecipes must be used within a SavedRecipesProvider');
  }
  return context;
};
