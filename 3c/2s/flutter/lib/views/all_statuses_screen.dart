import 'dart:io';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../view_models/user_view_model.dart';

class AllStatusesScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final userViewModel = Provider.of<UserViewModel>(context);
    final posts = userViewModel.allPosts;

    return Scaffold(
      appBar: AppBar(title: Text("Все статусы погоды")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
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
                title: Text('${post.username} — ${post.city}'), // Имя пользователя и город
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(post.weather),
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
    );
  }
}
