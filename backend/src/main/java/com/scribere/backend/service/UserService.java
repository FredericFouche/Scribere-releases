/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.scribere.backend.service;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scribere.backend.dto.UserDto;
import com.scribere.backend.mapper.UserMapper;
import com.scribere.backend.repository.UserRepository;

/**
 *
 * @author fred
 */
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Transactional(readOnly = true)
    public UserDto getUserProfile(UUID id) {
        return userRepository.findById(id)
                .map(userMapper::toDto)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserDto createUser(UserDto userDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUserProfile'");
    }

    public UserDto updateUser(UUID id, UserDto userDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
    }

}
