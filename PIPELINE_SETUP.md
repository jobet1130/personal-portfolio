# CI/CD Pipeline Setup Guide

## Required GitHub Secrets

To enable email notifications and error handling in the CI/CD pipeline, you need to configure the following GitHub secrets:

### 1. Gmail Configuration

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

### 2. Setting up GitHub Secrets

1. Navigate to your GitHub repository
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with the exact names above

## Pipeline Features

### ✅ Error Handling
- **Automatic Detection**: Pipeline monitors all jobs for failures
- **Email Notifications**: Sends detailed failure reports via Gmail
- **Auto-Revert**: Automatically reverts critical failures on master/main branch
- **Comprehensive Logging**: Captures detailed error information

### 📧 Email Notifications Include
- Repository and branch information
- Commit details and author
- Direct links to failed workflow and commit
- Step-by-step recovery instructions
- Automatic revert notifications (for critical failures)

### 🔄 Auto-Revert Process
- **Triggers**: Only on master/main branch failures
- **Action**: Automatically reverts the failing commit
- **Notification**: Sends separate email about revert completion
- **Safety**: Restores repository to previous stable state

## Testing the Setup

### 1. Test Email Notifications
```bash
# Intentionally break a test to trigger failure notification
echo "describe('broken test', () => { it('should fail', () => { expect(true).toBe(false); }); });" >> src/__tests__/test-failure.spec.ts
git add .
git commit -m "test: trigger pipeline failure for testing"
git push
```

### 2. Verify Secrets
- Check that all three secrets are properly configured in GitHub
- Ensure Gmail App Password is correctly generated
- Verify notification email address is correct

### 3. Monitor Pipeline
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