# CI/CD Pipeline Setup Guide

## Required GitHub Secrets

To enable email notifications and error handling in the CI/CD pipeline, you need to configure the following GitHub secrets:

### 1. DockerHub Configuration

#### `DOCKER_USERNAME`
- **Description**: Your DockerHub username
- **Example**: `your-dockerhub-username`
- **Setup**: Go to GitHub Repository → Settings → Secrets and variables → Actions → New repository secret

#### `DOCKER_PASSWORD`
- **Description**: DockerHub Access Token (not your DockerHub password)
- **Setup Steps**:
  1. Log in to DockerHub (https://hub.docker.com/)
  2. Go to Account Settings → Security → Access Tokens
  3. Click "New Access Token"
  4. Give it a name (e.g., "GitHub Actions")
  5. Select permissions: Read, Write, Delete
  6. Generate and copy the token
  7. Use this token as the secret value

### 2. Gmail Configuration

#### `GMAIL_USERNAME`
- **Description**: Your Gmail email address that will send the notifications
- **Example**: `your-email@gmail.com`
- **Setup**: Go to GitHub Repository → Settings → Secrets and variables → Actions → New repository secret

#### `GMAIL_APP_PASSWORD`
- **Description**: Gmail App Password (not your regular Gmail password)
- **Setup Steps**:
  1. Enable 2-Factor Authentication on your Gmail account
  2. Go to Google Account settings → Security → 2-Step Verification
  3. Scroll down to "App passwords"
  4. Generate a new app password for "Mail"
  5. Use this 16-character password as the secret value

#### `NOTIFICATION_EMAIL`
- **Description**: Email address that will receive failure notifications
- **Example**: `team@company.com` or `your-email@gmail.com`
- **Note**: Can be the same as GMAIL_USERNAME or different

### 3. Setting up GitHub Secrets

1. Navigate to your GitHub repository
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with the exact names above

**Required Secrets Summary:**
- `DOCKER_USERNAME` - Your DockerHub username
- `DOCKER_PASSWORD` - DockerHub access token
- `GMAIL_USERNAME` - Gmail address for sending notifications
- `GMAIL_APP_PASSWORD` - Gmail app password
- `NOTIFICATION_EMAIL` - Email to receive notifications

## Pipeline Features

### ✅ Error Handling
- **Automatic Detection**: Pipeline monitors all jobs for failures
- **Email Notifications**: Sends detailed failure reports via Gmail
- **Auto-Revert**: Automatically reverts critical failures on master/main branch
- **Comprehensive Logging**: Captures detailed error information

### 📧 Email Notifications Include
- **Success Notifications**: Sent when manually triggered workflow completes successfully
- **Failure Notifications**: Sent automatically when any job fails
- Repository and branch information
- Commit details and author
- Direct links to workflow and commit
- Step-by-step recovery instructions (for failures)
- Automatic revert notifications (for critical failures)

### 🔄 Auto-Revert Process
- **Triggers**: Only on master/main branch failures
- **Action**: Automatically reverts the failing commit
- **Notification**: Sends separate email about revert completion
- **Safety**: Restores repository to previous stable state

## Branch Promotion Workflow

The CI/CD pipeline now uses a **fully manual** branch promotion strategy:

### 🔄 Deployment Flow
```
develop → preTest → postTest → master
```

### 📋 Manual Process

1. **Promote Branch via Workflow Dispatch:**
   - Go to GitHub Actions tab
   - Click "Run workflow" on the CI/CD Pipeline
   - Select source branch (e.g., `develop`)
   - Select target branch (e.g., `preTest`)
   - Run the workflow

2. **Create Pull Request Manually:**
   - After workflow completes, create a PR manually
   - From source branch to target branch
   - Review changes carefully
   - Add appropriate reviewers

3. **Manual Merge:**
   - Review and approve the PR
   - Merge manually when ready
   - No automatic merging

4. **Repeat for Next Stage:**
   - Continue the process for next promotion
   - preTest → postTest → master

### ⚠️ Important Notes
- **All PR creation is manual**
- **All merging is manual**
- **No automatic deployments**
- **Full control over each stage**

## Testing the Setup

### 1. Test Manual Branch Promotion
- Go to GitHub Actions tab in your repository
- Click "Run workflow" on the CI/CD Pipeline
- Select `develop` as source, `preTest` as target
- Run the workflow manually
- Verify workflow completes successfully
- Create PR manually from develop to preTest
- Review and merge manually

### 2. Test Success Notifications (Manual Trigger Only)
- Use workflow_dispatch to trigger success notifications
- Verify you receive a success email when completed

### 3. Test Failure Notifications (Automatic)
```bash
# Intentionally break a test to trigger failure notification
echo "describe('broken test', () => { it('should fail', () => { expect(true).toBe(false); }); });" > src/__tests__/broken.spec.ts
git add .
git commit -m "Add broken test"
git push
```

### 4. Test Auto-Revert (Critical Branches)
- Push a failing commit to `master` or `main`
- Verify the pipeline reverts the commit
- Check for revert notification email

### 4. Verify Secrets
- Check that all three secrets are properly configured in GitHub
- Ensure Gmail App Password is correctly generated
- Verify notification email address is correct

### 5. Monitor Pipeline
- Go to Actions tab in your GitHub repository
- Watch for the failure notification job to run
- Check your email for the failure notification

## Troubleshooting

### Common Issues

1. **Email not received**
   - Check spam/junk folder
   - Verify GMAIL_APP_PASSWORD is correct (16 characters)
   - Ensure 2FA is enabled on Gmail account

2. **Revert fails**
   - Check if the notification job has `contents: write` permission
   - Verify the branch protection rules allow automated pushes

3. **Secrets not working**
   - Ensure secret names match exactly (case-sensitive)
   - Re-generate Gmail App Password if needed
   - Check repository settings for secret visibility

### Support

If you encounter issues:
1. Check the Actions logs for detailed error messages
2. Verify all secrets are properly configured
3. Test with a simple failure first
4. Review Gmail security settings

---

**Note**: This setup provides comprehensive error handling and notification system for your CI/CD pipeline, ensuring you're immediately informed of any issues and critical failures are automatically reverted.