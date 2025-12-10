import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type Product = {
  id: number;
  name: string;
  category: string;
  image: string;
  sellers: {
    name: string;
    price: number;
    rating: number;
  }[];
  isFavorite: boolean;
  isPriceTracked: boolean;
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Москва');
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'iPhone 15 Pro 256GB',
      category: 'Смартфоны',
      image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&h=400&fit=crop',
      sellers: [
        { name: 'TechStore', price: 89990, rating: 4.8 },
        { name: 'MegaMarket', price: 92490, rating: 4.6 },
        { name: 'ElectroShop', price: 91290, rating: 4.7 }
      ],
      isFavorite: false,
      isPriceTracked: false
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      category: 'Смартфоны',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
      sellers: [
        { name: 'SamsungStore', price: 99990, rating: 4.9 },
        { name: 'DNS', price: 102990, rating: 4.5 },
        { name: 'Citylink', price: 101490, rating: 4.6 }
      ],
      isFavorite: false,
      isPriceTracked: false
    },
    {
      id: 3,
      name: 'MacBook Air M2',
      category: 'Ноутбуки',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
      sellers: [
        { name: 'Apple Store', price: 119990, rating: 5.0 },
        { name: 're:Store', price: 122990, rating: 4.8 },
        { name: 'М.Видео', price: 121490, rating: 4.7 }
      ],
      isFavorite: false,
      isPriceTracked: false
    },
    {
      id: 4,
      name: 'Sony WH-1000XM5',
      category: 'Наушники',
      image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=400&fit=crop',
      sellers: [
        { name: 'SonyShop', price: 29990, rating: 4.9 },
        { name: 'Эльдорадо', price: 31490, rating: 4.6 },
        { name: 'Ozon', price: 30490, rating: 4.7 }
      ],
      isFavorite: false,
      isPriceTracked: false
    }
  ]);

  const toggleFavorite = (id: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const togglePriceTracking = (id: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isPriceTracked: !p.isPriceTracked } : p
    ));
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteCount = products.filter(p => p.isFavorite).length;
  const trackedCount = products.filter(p => p.isPriceTracked).length;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold font-heading">FindMarket</h1>
              
              <nav className="hidden lg:flex items-center gap-6">
                <Button variant="ghost" className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/90">
                  <Icon name="Search" size={18} className="mr-2" />
                  Поиск
                </Button>
                <Button variant="ghost" className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/90">
                  <Icon name="Info" size={18} className="mr-2" />
                  О сервисе
                </Button>
                <Button variant="ghost" className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/90">
                  <Icon name="Mail" size={18} className="mr-2" />
                  Контакты
                </Button>
              </nav>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Button variant="ghost" className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/90">
                <Icon name="MapPin" size={18} className="mr-2" />
                {location}
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/90 relative">
                <Icon name="Package" size={18} className="mr-2" />
                Мои товары
                {favoriteCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-white">
                    {favoriteCount}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/90 relative">
                <Icon name="Bell" size={18} className="mr-2" />
                Уведомления
                {trackedCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-white">
                    {trackedCount}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:text-primary-foreground hover:bg-primary/90">
                <Icon name="User" size={18} className="mr-2" />
                Кабинет
              </Button>
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Icon name="LogIn" size={18} className="mr-2" />
                Войти
              </Button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-primary-foreground">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  <Button variant="ghost" className="justify-start">
                    <Icon name="Search" size={18} className="mr-2" />
                    Поиск
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <Icon name="Info" size={18} className="mr-2" />
                    О сервисе
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <Icon name="Mail" size={18} className="mr-2" />
                    Контакты
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <Icon name="MapPin" size={18} className="mr-2" />
                    {location}
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <Icon name="Package" size={18} className="mr-2" />
                    Мои товары
                    {favoriteCount > 0 && (
                      <Badge className="ml-2">{favoriteCount}</Badge>
                    )}
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <Icon name="Bell" size={18} className="mr-2" />
                    Уведомления
                    {trackedCount > 0 && (
                      <Badge className="ml-2">{trackedCount}</Badge>
                    )}
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <Icon name="User" size={18} className="mr-2" />
                    Кабинет
                  </Button>
                  <Button variant="default" className="justify-start">
                    <Icon name="LogIn" size={18} className="mr-2" />
                    Войти
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold font-heading mb-4 text-center">Найдите лучшие цены для вашего бизнеса</h2>
          <p className="text-muted-foreground text-center mb-6 text-lg">Сравните предложения от тысяч продавцов</p>
          
          <div className="max-w-2xl mx-auto relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold font-heading">
              {searchQuery ? `Результаты поиска: ${filteredProducts.length}` : 'Популярные товары'}
            </h3>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-sm">
                <Icon name="Heart" size={14} className="mr-1" />
                Избранное: {favoriteCount}
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Icon name="TrendingDown" size={14} className="mr-1" />
                Отслеживается: {trackedCount}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    size="icon"
                    variant={product.isFavorite ? "default" : "secondary"}
                    className="absolute top-2 right-2 rounded-full shadow-lg"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Icon 
                      name={product.isFavorite ? "Heart" : "Heart"} 
                      size={18}
                      className={product.isFavorite ? "fill-current" : ""}
                    />
                  </Button>
                  <Badge className="absolute top-2 left-2">{product.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="text-lg mb-3 line-clamp-2">{product.name}</CardTitle>
                <CardDescription className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <span className="text-sm font-medium text-accent-foreground">Лучшая цена:</span>
                    <span className="text-xl font-bold text-primary">
                      {product.sellers[0].price.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <div className="space-y-1">
                    {product.sellers.slice(0, 3).map((seller, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          {seller.name}
                          <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">{seller.rating}</span>
                        </span>
                        <span className={idx === 0 ? "font-semibold text-primary" : ""}>
                          {seller.price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground pt-2">
                    Экономия до {(product.sellers[product.sellers.length - 1].price - product.sellers[0].price).toLocaleString('ru-RU')} ₽
                  </div>
                </CardDescription>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant={product.isPriceTracked ? "default" : "outline"} 
                  className="flex-1"
                  onClick={() => togglePriceTracking(product.id)}
                >
                  <Icon name={product.isPriceTracked ? "BellOff" : "Bell"} size={16} className="mr-2" />
                  {product.isPriceTracked ? "Отслеживается" : "Отслеживать"}
                </Button>
                <Button variant="secondary" size="icon">
                  <Icon name="ExternalLink" size={16} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить поисковый запрос</p>
          </div>
        )}
      </main>

      <footer className="border-t mt-16 py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold font-heading text-lg mb-3">FindMarket</h4>
              <p className="text-sm text-muted-foreground">Находим выгодные цены для вашего бизнеса</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Сервис</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Как работает</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Партнеры</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Поддержка</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Связь</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: info@findmarket.ru</li>
                <li>Тел: 8 (800) 555-35-35</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 FindMarket. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
