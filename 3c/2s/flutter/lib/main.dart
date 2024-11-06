import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:provider/provider.dart';
import 'view_models/user_view_model.dart';
import 'view_models/weather_view_model.dart';
import 'views/home_view.dart';
import 'views/auth_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => UserViewModel()),
        ChangeNotifierProvider(create: (_) => WeatherViewModel()),
      ],
      child: MaterialApp(
        title: 'Weather App',
        theme: ThemeData(primarySwatch: Colors.blue),
        home: AuthScreen(), // Запуск с экрана авторизации
      ),
    );
  }
}
