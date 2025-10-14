import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { apiService } from '@/services/api';

interface Recipe {
  id: number;
  name: string;
  time: string;
  servings: number;
  image: string;
}

interface SavedRecipesContextType {
  savedRecipes: Recipe[];
  createdRecipes: Recipe[];
  saveRecipe: (recipe: Recipe) => void;
  unsaveRecipe: (recipeId: number) => void;
  isRecipeSaved: (recipeId: number) => boolean;
  createRecipe: (recipe: Recipe) => void;
  deleteCreatedRecipe: (recipeId: number) => void;
}

const SavedRecipesContext = createContext<SavedRecipesContextType | undefined>(undefined);

export const SavedRecipesProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [createdRecipes, setCreatedRecipes] = useState<Recipe[]>([]);

  // Load recipes based on user type
  useEffect(() => {
    const loadRecipes = async () => {
      if (isAuthenticated && user?.isPremium) {
        // Premium users: load from database
        try {
          const recipes = await apiService.getRecipes();
          setSavedRecipes(recipes.saved || []);
          setCreatedRecipes(recipes.created || []);
        } catch (error) {
          console.error('Failed to load recipes from database:', error);
        }
      } else {
        // Free users: load from localStorage
        const saved = localStorage.getItem('savedRecipes');
        const created = localStorage.getItem('createdRecipes');
        setSavedRecipes(saved ? JSON.parse(saved) : []);
        setCreatedRecipes(created ? JSON.parse(created) : []);
      }
    };

    loadRecipes();
  }, [isAuthenticated, user]);

  // Save recipes based on user type
  const saveToStorage = async (savedRecipes: Recipe[], createdRecipes: Recipe[]) => {
    if (isAuthenticated && user?.isPremium) {
      // Premium users: save to database
      try {
        await apiService.saveRecipes({ saved: savedRecipes, created: createdRecipes });
      } catch (error) {
        console.error('Failed to save recipes to database:', error);
      }
    } else {
      // Free users: save to localStorage
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
      localStorage.setItem('createdRecipes', JSON.stringify(createdRecipes));
    }
  };

  // Save whenever recipes change
  useEffect(() => {
    if (savedRecipes.length > 0 || createdRecipes.length > 0) {
      saveToStorage(savedRecipes, createdRecipes);
    }
  }, [savedRecipes, createdRecipes, isAuthenticated, user]);

  const saveRecipe = (recipe: Recipe) => {
    setSavedRecipes(prev => {
      if (prev.find(r => r.id === recipe.id)) {
        return prev;
      }
      return [...prev, recipe];
    });
  };

  const unsaveRecipe = (recipeId: number) => {
    setSavedRecipes(prev => prev.filter(r => r.id !== recipeId));
  };

  const isRecipeSaved = (recipeId: number) => {
    return savedRecipes.some(r => r.id === recipeId);
  };

  const createRecipe = (recipe: Recipe) => {
    setCreatedRecipes(prev => [...prev, recipe]);
  };

  const deleteCreatedRecipe = (recipeId: number) => {
    setCreatedRecipes(prev => prev.filter(r => r.id !== recipeId));
  };

  return (
    <SavedRecipesContext.Provider value={{ 
      savedRecipes, 
      createdRecipes,
      saveRecipe, 
      unsaveRecipe, 
      isRecipeSaved,
      createRecipe,
      deleteCreatedRecipe
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
