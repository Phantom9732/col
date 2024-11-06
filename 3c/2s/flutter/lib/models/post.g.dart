// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'post.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Post _$PostFromJson(Map<String, dynamic> json) => Post(
      weather: json['weather'] as String,
      comment: json['comment'] as String,
      date: DateTime.parse(json['date'] as String),
      username: json['username'] as String,
      profileImage: json['profileImage'] as String?,
      city: json['city'] as String,
    );

Map<String, dynamic> _$PostToJson(Post instance) => <String, dynamic>{
      'weather': instance.weather,
      'comment': instance.comment,
      'date': instance.date.toIso8601String(),
      'username': instance.username,
      'profileImage': instance.profileImage,
      'city': instance.city,
    };
