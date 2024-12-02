package com.umsm.user_management_system_monolithic.repo;

import com.umsm.user_management_system_monolithic.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    @Query(value="SELECT * FROM User WHERE id=?1",nativeQuery = true)
    User getUserById(Integer UserId); //this is coustom interface methode
}
