package com.afreen.jobmanagement.repository;

import com.afreen.jobmanagement.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository
        extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByCompanyNameContainingIgnoreCase(String companyName);

    List<JobApplication> findByStatusIgnoreCase(String status);
}