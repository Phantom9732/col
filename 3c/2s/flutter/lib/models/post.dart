import 'package:json_annotation/json_annotation.dart';

part 'post.g.dart';

@JsonSerializable()
class Post {
  final String weather;
  final String comment;
  final DateTime date;
  final String username;
  final String? profileImage; // Изображение профиля
  final String city; // Название города

  Post({
    required this.weather,
    required this.comment,
    required this.date,
    required this.username,
    this.profileImage,
    required this.city,
  });

  factory Post.fromJson(Map<String, dynamic> json) => _$PostFromJson(json);
  Map<String, dynamic> toJson() => _$PostToJson(this);
}
