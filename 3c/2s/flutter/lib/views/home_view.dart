import 'package:flutter/material.dart';
import 'profile_screen.dart';
import 'settings_screen.dart';
import 'all_statuses_screen.dart';
import 'weather_screen.dart';

class HomeView extends StatefulWidget {
  @override
  _HomeViewState createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  int _selectedIndex = 0;

  static List<Widget> _screens = <Widget>[
    WeatherScreen(),
    ProfileScreen(),
    AllStatusesScreen(),  // Экран всех статусов погоды
    SettingsScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(icon: Icon(Icons.cloud), label: 'Погода'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Профиль'),
          BottomNavigationBarItem(icon: Icon(Icons.list), label: 'Все статусы'),
          BottomNavigationBarItem(icon: Icon(Icons.settings), label: 'Настройки'),
        ],
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        backgroundColor: Colors.black,        // Черный фон для панели
        selectedItemColor: Colors.white,      // Белый цвет для выбранного элемента
        unselectedItemColor: Colors.white70,  // Белый цвет с прозрачностью для неактивных элементов
        type: BottomNavigationBarType.fixed,  // Отключаем анимацию
      ),
    );
  }
}
