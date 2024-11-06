import 'package:flutter/material.dart';
import '../services/weather_service.dart';

class WeatherViewModel with ChangeNotifier {
  final WeatherService _weatherService = WeatherService();
  Map<String, dynamic>? _weatherData;

  Map<String, dynamic>? get weatherData => _weatherData;

  Future<void> fetchWeather(String city) async {
    try {
      _weatherData = await _weatherService.fetchWeather(city);
      notifyListeners();
    } catch (e) {
      print('Ошибка получения данных: $e');
    }
  }
}
