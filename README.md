### Core Features

1. User Authentication and Authorization
   Sign Up/In: Allow job seekers and employers to create accounts and log in.
   Roles: Differentiate between job seekers and employers to control access to specific features.
   Profile Management: Users should be able to manage their profiles, including updating personal information and profile pictures.

2. Job Listings
   Job Creation: Employers can create job listings with details like title, description, requirements, salary, location, and application deadline.
   Job Management: Employers can edit or delete their job postings.
   Job Search and Filtering: Job seekers can search for jobs by keywords, location, job type, and other filters.

3. Job Applications
   Resume Upload: Job seekers can upload their resumes and cover letters when applying for a job.
   Application Tracking: Employers can view and manage the applications received for each job posting.
   Application Status: Employers can update the status of applications (e.g., reviewed, rejected, accepted).

4. User Dashboards
   Job Seekers: Track applied jobs, manage saved jobs, and update personal profiles.
   Employers: Manage posted jobs, view applicant profiles, and track application statuses.

5. Notifications
   Email Notifications: Notify users about new applications, job postings, and status updates via email.
   In-app Notifications: Real-time notifications within the application for important updates.

6. Admin Panel
   User Management: Admin can manage all users, including banning or promoting users.
   Job Management: Admin can review, approve, or reject job postings to maintain quality.

### Relationships

A User can have one Profile.
A User (as an employer) can post many Jobs.
A Job can have many Applications.
A User (as a job seeker) can apply to many Jobs through Applications.
A User can receive many Notifications.
Admin manages the platform but is a specialized user.

## Models (Tables)

# User: Represents a user of the platform.

id: Primary key.
email: Unique email address.
password: Password for authentication.
role: Role of the user (ADMIN, EMPLOYER, JOB_SEEKER).
profile: One-to-one relation with Profile.
jobs: One-to-many relation with Job (for employers).
applications: One-to-many relation with Application.
notifications: One-to-many relation with Notification.
createdAt, updatedAt: Timestamps for record tracking.

# Profile: Additional information about a user.

id: Primary key.
firstName, lastName: User's name.
bio: User's biography.
userId: Foreign key linking to User.
user: The relation to User.

# Job: Represents a job posting.

id: Primary key.
title, description, requirements: Job details.
salary: Offered salary.
location: Job location.
deadline: Application deadline.
employerId: Foreign key linking to the employer (User).
employer: The relation to User.
applications: One-to-many relation with Application.
createdAt, updatedAt: Timestamps for record tracking.

# Application: Represents a job application.

id: Primary key.
jobId: Foreign key linking to Job.
job: The relation to Job.
userId: Foreign key linking to User.
user: The relation to User.
resumeUrl: URL of the uploaded resume.
coverLetter: Cover letter text.
status: Status of the application (PENDING, REVIEWED, ACCEPTED, REJECTED).
createdAt, updatedAt: Timestamps for record tracking.

# Notification: Represents notifications sent to users.

id: Primary key.
message: Notification message.
read: Read status of the notification.
userId: Foreign key linking to User.
user: The relation to User.
createdAt, updatedAt: Timestamps for record tracking.

# Admin: Represents admin users.

id: Primary key.
userId: Foreign key linking to User.
user: The relation to User.
createdAt, updatedAt: Timestamps for record tracking.

### Relationships

User and Profile: One-to-one relationship (a user has one profile).
User and Job: One-to-many relationship (an employer can post many jobs).
User and Application: One-to-many relationship (a job seeker can apply to many jobs).
Job and Application: One-to-many relationship (a job can receive many applications).
User and Notification: One-to-many relationship (a user can receive many notifications).
Admin and User: One-to-one relationship (an admin is a specialized user).
