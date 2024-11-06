import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../view_models/user_view_model.dart';
import 'auth_screen.dart';

class SettingsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final userViewModel = Provider.of<UserViewModel>(context);

    return Scaffold(
      appBar: AppBar(title: Text("Настройки")),
      body: Center(
        child: ElevatedButton(
          onPressed: () async {
            await userViewModel.signOut();
            Navigator.of(context).pushReplacement(
              MaterialPageRoute(builder: (context) => AuthScreen()),
            );
          },
          child: Text("Выйти"),
        ),
      ),
    );
  }
}
