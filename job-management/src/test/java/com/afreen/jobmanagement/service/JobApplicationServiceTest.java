package com.afreen.jobmanagement.service;

import com.afreen.jobmanagement.exception.ResourceNotFoundException;
import com.afreen.jobmanagement.model.JobApplication;
import com.afreen.jobmanagement.repository.JobApplicationRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JobApplicationServiceTest {

    @Mock
    private JobApplicationRepository repository;

    @InjectMocks
    private JobApplicationService service;

    private JobApplication application;

    @BeforeEach
    void setUp() {
        application = new JobApplication();
        application.setCompanyName("TCS");
        application.setJobTitle("Java Developer");
        application.setLocation("Toronto");
        application.setStatus("APPLIED");
    }

    @Test
    void shouldGetAllApplications() {

        when(repository.findAll())
                .thenReturn(List.of(application));

        List<JobApplication> result =
                service.getAllApplications();

        assertEquals(1, result.size());
        assertEquals(
                "TCS",
                result.get(0).getCompanyName()
        );

        verify(repository).findAll();
    }

    @Test
    void shouldGetApplicationById() {

        when(repository.findById(1L))
                .thenReturn(Optional.of(application));

        JobApplication result =
                service.getApplicationById(1L);

        assertEquals(
                "Java Developer",
                result.getJobTitle()
        );

        verify(repository).findById(1L);
    }

    @Test
    void shouldThrowExceptionWhenApplicationNotFound() {

        when(repository.findById(9999L))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> service.getApplicationById(9999L)
        );

        verify(repository).findById(9999L);
    }

    @Test
    void shouldCreateApplication() {

        when(repository.save(application))
                .thenReturn(application);

        JobApplication result =
                service.createApplication(application);

        assertEquals(
                "TCS",
                result.getCompanyName()
        );

        verify(repository).save(application);
    }
}