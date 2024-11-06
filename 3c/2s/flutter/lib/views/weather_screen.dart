import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../view_models/weather_view_model.dart';
import '../view_models/user_view_model.dart';

class WeatherScreen extends StatefulWidget {
  @override
  _WeatherScreenState createState() => _WeatherScreenState();
}

class _WeatherScreenState extends State<WeatherScreen> {
  final TextEditingController _cityController = TextEditingController();
  final TextEditingController _commentController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final weatherViewModel = Provider.of<WeatherViewModel>(context);
    final userViewModel = Provider.of<UserViewModel>(context);

    return Scaffold(
      appBar: AppBar(title: Text("Погода")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _cityController,
              decoration: InputDecoration(
                labelText: 'Введите город',
                suffixIcon: IconButton(
                  icon: Icon(Icons.search),
                  onPressed: () {
                    final city = _cityController.text;
                    if (city.isNotEmpty) {
                      weatherViewModel.fetchWeather(city);
                    }
                  },
                ),
              ),
            ),
            SizedBox(height: 20),
            weatherViewModel.weatherData != null
                ? Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Город: ${weatherViewModel.weatherData!['name']}',
                        style: TextStyle(fontSize: 20),
                      ),
                      Text(
                        'Температура: ${weatherViewModel.weatherData!['main']['temp']}°C',
                        style: TextStyle(fontSize: 16),
                      ),
                      Text(
                        'Описание: ${weatherViewModel.weatherData!['weather'][0]['description']}',
                        style: TextStyle(fontSize: 16),
                      ),
                      SizedBox(height: 10),
                      TextField(
                        controller: _commentController,
                        decoration: InputDecoration(
                          labelText: 'Комментарий по погоде',
                        ),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          final comment = _commentController.text;
                          final weather =
                              '${weatherViewModel.weatherData!['main']['temp']}°C, ${weatherViewModel.weatherData!['weather'][0]['description']}';
                          final city = weatherViewModel.weatherData!['name'];
                          userViewModel.addPost(weather, comment, city);
                          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            content: Text('Пост опубликован!'),
                          ));
                          _commentController.clear();
                        },
                        child: Text("Опубликовать"),
                      ),
                    ],
                  )
                : Text("Введите город и нажмите на поиск для получения данных."),
          ],
        ),
      ),
    );
  }
}
