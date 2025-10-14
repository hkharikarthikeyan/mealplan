import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Clock, Users, Bookmark, BookmarkCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSavedRecipes } from '@/contexts/SavedRecipesContext';
import { useToast } from '@/hooks/use-toast';

const mockRecipes = [
  { id: '1', name: 'Grilled Chicken Salad', ingredients: 'Chicken, lettuce, tomatoes', instructions: 'Grill chicken and mix with salad', image: '🥗' },
  { id: '2', name: 'Spaghetti Carbonara', ingredients: 'Pasta, eggs, bacon, cheese', instructions: 'Cook pasta and mix with carbonara sauce', image: '🍝' },
  { id: '3', name: 'Avocado Toast', ingredients: 'Bread, avocado, salt', instructions: 'Toast bread and top with mashed avocado', image: '🥑' },
  { id: '4', name: 'Veggie Stir Fry', ingredients: 'Mixed vegetables, soy sauce', instructions: 'Stir fry vegetables with sauce', image: '🥘' },
  { id: '5', name: 'Margherita Pizza', ingredients: 'Pizza dough, tomato, mozzarella', instructions: 'Bake pizza with toppings', image: '🍕' },
  { id: '6', name: 'Caesar Salad', ingredients: 'Lettuce, croutons, parmesan', instructions: 'Mix salad with caesar dressing', image: '🥗' },
  { id: '7', name: 'Beef Tacos', ingredients: 'Beef, tortillas, vegetables', instructions: 'Cook beef and assemble tacos', image: '🌮' },
  { id: '8', name: 'Chocolate Cake', ingredients: 'Flour, cocoa, eggs, sugar', instructions: 'Bake chocolate cake', image: '🍰' },
];

export const Discover = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { saveRecipe, deleteRecipe, isRecipeSaved, savedRecipes, loading } = useSavedRecipes();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Combine mock recipes with user-saved recipes
  const allRecipes = [...savedRecipes, ...mockRecipes];

  const filteredRecipes = allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveToggle = async (recipe: typeof mockRecipes[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (isRecipeSaved(recipe.id)) {
        await deleteRecipe(recipe.id);
        toast({
          title: "Recipe removed",
          description: `${recipe.name} removed from your recipes`,
        });
      } else {
        await saveRecipe({
          name: recipe.name,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions
        });
        toast({
          title: "Recipe saved!",
          description: `${recipe.name} added to your recipes`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save recipe. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-24">
      <Header 
        title="Discover" 
        showBackButton={true}
        onBackClick={() => navigate(-1)}
      />
      
      <main className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="relative mb-4 sm:mb-6 animate-fade-in">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base"
          />
        </div>

        {/* Recipes Grid */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg md:text-xl font-heading font-semibold mb-3 sm:mb-4">
            All Recipes ({filteredRecipes.length})
          </h3>
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe, idx) => {
              const isSaved = isRecipeSaved(recipe.id);
              return (
                <Card 
                  key={recipe.id}
                  className="p-3 sm:p-4 hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-up" 
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <Link to={`/recipe/${recipe.id}`} className="block">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-muted rounded-xl sm:rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shrink-0">
                        {recipe.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1 sm:mb-2 line-clamp-2">{recipe.name}</h4>
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Quick & Easy
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            Popular
                          </span>
                        </div>
                      </div>
                      <Button
                        variant={isSaved ? "default" : "outline"}
                        size="icon"
                        className="shrink-0 h-8 w-8 sm:h-9 sm:w-9"
                        onClick={(e) => handleSaveToggle(recipe, e)}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <Bookmark className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                      </Button>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
