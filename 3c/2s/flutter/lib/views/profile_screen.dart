import 'dart:io';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../view_models/user_view_model.dart';

class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final userViewModel = Provider.of<UserViewModel>(context);
    final posts = userViewModel.userPosts;

    return Scaffold(
      appBar: AppBar(title: Text("Профиль")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Добавляем секцию для отображения и загрузки изображения профиля
            Center(
              child: Column(
                children: [
                  CircleAvatar(
                    radius: 50,
                    backgroundImage: userViewModel.profileImage != null
                        ? FileImage(userViewModel.profileImage!) as ImageProvider
                        : AssetImage('assets/default_avatar.png'),
                  ),
                  SizedBox(height: 10),
                  TextButton(
                    onPressed: () async {
                      await userViewModel.pickProfileImage();
                    },
                    child: Text("Выбрать фото профиля"),
                  ),
                ],
              ),
            ),
            SizedBox(height: 20),
            Text("Ваши записи о погоде:", style: TextStyle(fontSize: 20)),
            SizedBox(height: 10),
            Expanded(
              child: ListView.builder(
                itemCount: posts.length,
                itemBuilder: (context, index) {
                  final post = posts[index];
                  return Card(
                    margin: EdgeInsets.symmetric(vertical: 8.0),
                    child: ListTile(
                      leading: CircleAvatar(
                        radius: 25,
                        backgroundImage: post.profileImage != null
                            ? FileImage(File(post.profileImage!)) as ImageProvider
                            : AssetImage('assets/default_avatar.png'),
                      ),
                      title: Text('${post.weather} — ${post.city}'), // Погода и город
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(post.comment),
                          Text(
                            'Дата: ${post.date.toLocal()}',
                            style: TextStyle(fontSize: 12, color: Colors.grey),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
