import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CalculatorState {
  distance: number;
  petSize: string;
  timeOfDay: string;
  isUrgent: boolean;
}

const PriceCalculator = () => {
  const [calc, setCalc] = useState<CalculatorState>({
    distance: 0,
    petSize: '',
    timeOfDay: '',
    isUrgent: false
  });
  
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    if (!calc.distance || !calc.petSize) {
      return;
    }

    const basePrice = 1000; // Базовая стоимость подачи
    const pricePerKm = 50; // Стоимость за км

    // Доплата за размер питомца
    let sizeMultiplier = 1;
    switch (calc.petSize) {
      case 'small':
        sizeMultiplier = 1;
        break;
      case 'medium':
        sizeMultiplier = 1.2;
        break;
      case 'large':
        sizeMultiplier = 1.5;
        break;
      case 'xl':
        sizeMultiplier = 2;
        break;
    }

    // Доплата за время
    let timeMultiplier = 1;
    if (calc.timeOfDay === 'night') {
      timeMultiplier = 1.3;
    } else if (calc.timeOfDay === 'weekend') {
      timeMultiplier = 1.2;
    }

    // Доплата за срочность
    let urgentMultiplier = calc.isUrgent ? 1.5 : 1;

    const totalPrice = Math.round(
      (basePrice + (calc.distance * pricePerKm)) * sizeMultiplier * timeMultiplier * urgentMultiplier
    );

    setEstimatedPrice(totalPrice);
  };

  useEffect(() => {
    calculatePrice();
  }, [calc]);

  const handleInputChange = (field: keyof CalculatorState, value: string | number | boolean) => {
    setCalc(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon name="Calculator" className="mr-2" size={24} />
          Калькулятор стоимости
        </CardTitle>
        <CardDescription>
          Рассчитайте примерную стоимость поездки
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="distance">Расстояние (км)</Label>
          <Input
            id="distance"
            type="number"
            placeholder="Введите расстояние"
            value={calc.distance || ''}
            onChange={(e) => handleInputChange('distance', Number(e.target.value))}
            min="1"
            max="100"
          />
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border">
          <p className="text-sm text-gray-600 text-center">
            Стоимость: <span className="font-bold text-primary">1000₽ подача + 50₽/км</span><br/>
            <span className="text-xs text-primary">Ожидание: 500₽ за каждые 15 минут</span>
          </p>
        </div>

        <div>
          <Label htmlFor="petSize">Размер питомца</Label>
          <Select onValueChange={(value) => handleInputChange('petSize', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите размер" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Маленький (до 5 кг)</SelectItem>
              <SelectItem value="medium">Средний (5-15 кг)</SelectItem>
              <SelectItem value="large">Крупный (15-30 кг)</SelectItem>
              <SelectItem value="xl">Очень крупный (30+ кг)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="timeOfDay">Время поездки</Label>
          <Select onValueChange={(value) => handleInputChange('timeOfDay', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите время" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Дневное время (7:00-22:00)</SelectItem>
              <SelectItem value="night">Ночное время (22:00-7:00) +30%</SelectItem>
              <SelectItem value="weekend">Выходные дни +20%</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="urgent"
            checked={calc.isUrgent}
            onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
            className="rounded border-gray-300"
          />
          <Label htmlFor="urgent" className="text-sm">
            Срочная подача (в течение 15 минут) +50%
          </Label>
        </div>

        {estimatedPrice && (
          <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary/20">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Примерная стоимость:</p>
              <p className="text-3xl font-bold text-primary">
                {estimatedPrice.toLocaleString()}₽
              </p>
              <p className="text-xs text-gray-500 mt-1">
                * Окончательная стоимость может отличаться
              </p>
            </div>
          </div>
        )}

        <Button 
          className="w-full" 
          onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          disabled={!estimatedPrice}
        >
          <Icon name="ArrowRight" className="mr-2" size={16} />
          Заказать поездку
        </Button>
      </CardContent>
    </Card>
  );
};

export default PriceCalculator;