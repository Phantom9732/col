import 'dart:io';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:image_picker/image_picker.dart';
import '../models/post.dart';
import '../services/auth_service.dart';

class UserViewModel extends ChangeNotifier {
  final AuthService _authService = AuthService();
  User? _currentUser;
  File? _profileImage;

  List<Post> _userPosts = [];
  List<Post> get userPosts => _userPosts;

  List<Post> _allPosts = [];
  List<Post> get allPosts => _allPosts;

  User? get currentUser => _currentUser;
  File? get profileImage => _profileImage;

  UserViewModel() {
    _currentUser = _authService.currentUser;
  }

  Future<void> signIn(String email, String password) async {
    try {
      await _authService.signIn(email, password);
      _currentUser = _authService.currentUser;
      notifyListeners();
    } catch (e) {
      print('Ошибка при входе: $e');
      rethrow;
    }
  }

  Future<void> signUp(String email, String password) async {
    try {
      await _authService.signUp(email, password);
      _currentUser = _authService.currentUser;

      await _currentUser?.updateDisplayName(email.split('@')[0]);
      await _currentUser?.reload();
      _currentUser = _authService.currentUser;
      notifyListeners();
    } catch (e) {
      print('Ошибка при регистрации: $e');
      rethrow;
    }
  }

  Future<void> signOut() async {
    try {
      await _authService.signOut();
      _currentUser = null;
      _userPosts.clear();
      _profileImage = null;
      notifyListeners();
    } catch (e) {
      print('Ошибка при выходе: $e');
      rethrow;
    }
  }

  void addPost(String weather, String comment, String city) {
    final post = Post(
      weather: weather,
      comment: comment,
      date: DateTime.now(),
      username: _currentUser?.displayName ?? _currentUser?.email ?? 'Аноним',
      profileImage: _profileImage?.path, // Передаем путь к изображению профиля
      city: city, // Передаем название города
    );
    _userPosts.add(post);
    _allPosts.add(post);
    notifyListeners();
  }

  // Метод для выбора изображения профиля
  Future<void> pickProfileImage() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      _profileImage = File(pickedFile.path);
      notifyListeners();
    }
  }
}
