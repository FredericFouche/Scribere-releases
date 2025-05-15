/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.scribere.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scribere.backend.model.User;

/**
 *
 * @author fred
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID>{
    List<User> findByEmail(String email);
}
