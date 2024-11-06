import 'package:firebase_auth/firebase_auth.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  User? get currentUser => _auth.currentUser;

  /// Вход в систему с email и паролем
  Future<void> signIn(String email, String password) async {
    try {
      await _auth.signInWithEmailAndPassword(email: email, password: password);
    } on FirebaseAuthException catch (e) {
      // Обработка различных ошибок FirebaseAuth
      switch (e.code) {
        case 'invalid-email':
          throw Exception('Неверный формат email.');
        case 'user-not-found':
          throw Exception('Пользователь не найден.');
        case 'wrong-password':
          throw Exception('Неверный пароль.');
        default:
          throw Exception('Ошибка входа: ${e.message}');
      }
    } catch (e) {
      throw Exception('Произошла ошибка: $e');
    }
  }

  /// Регистрация нового пользователя с email и паролем
  Future<void> signUp(String email, String password) async {
    try {
      await _auth.createUserWithEmailAndPassword(email: email, password: password);
    } on FirebaseAuthException catch (e) {
      switch (e.code) {
        case 'email-already-in-use':
          throw Exception('Этот email уже используется.');
        case 'invalid-email':
          throw Exception('Неверный формат email.');
        case 'weak-password':
          throw Exception('Слишком слабый пароль.');
        default:
          throw Exception('Ошибка регистрации: ${e.message}');
      }
    } catch (e) {
      throw Exception('Произошла ошибка: $e');
    }
  }

  /// Выход из системы
  Future<void> signOut() async {
    try {
      await _auth.signOut();
    } catch (e) {
      throw Exception('Ошибка при выходе из системы: $e');
    }
  }
}
