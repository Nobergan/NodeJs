# 📧 Email Notification System

This project features a modular email sending system built with **Nodemailer** and **Handlebars**, allowing for dynamic, template-based communication with users.

## 🛠 Tech Stack

- **Transport**: [Nodemailer](https://nodemailer.com/) - Node.js module for easy email sending.
- **Template Engine**: [Handlebars](https://handlebarsjs.com/) - Clean, semantic templates with logic-less syntax.
- **Provider Support**: Configured for SMTP (e.g., Gmail, Mailtrap).

## 📂 Project Structure

- **Service**: `src/services/email.service.ts` — contains the core logic for rendering and sending emails.
- **Templates**: `src/templates/` — stores `.hbs` template files.
  - `src/templates/base.hbs`: The master layout containing the universal HTML structure.
  - `src/templates/welcome.hbs`: The content-specific template for registration.

## ⚙️ Core Logic

### 1. Template Rendering
The `EmailService` uses a private method `_renderTemplate` to inject partial content into the base layout.
- It reads `base.hbs` and the specific child template (e.g., `welcome.hbs`).
- It compiles them using Handlebars and merges the provided context (e.g., user's name).

### 2. Sending Emails
The `sendEmail` method handles the transport:
```typescript
public async sendEmail(
    to: string,
    subject: string,
    templateName: string,
    context: Record<string, any>,
): Promise<void>
```

## 🔄 User Workflow: Registration
Currently, the email system is integrated into the `signUp` process:
1. A new user registers via `AuthService.signUp`.
2. Upon successful DB creation, the `emailService.sendEmail` is called.
3. The user receives a **Welcome** email rendered via the `welcome.hbs` template.

## ✅ Account Activation Flow
After registration:
1. The user receives an **activation email** with a link that contains an action token of type `ActionTokenType.ACTIVATE`.
2. The frontend builds the activation URL as `${config.FRONTEND_URL}/activate/:token`, where `:token` is the generated action token.
3. The link should call the backend endpoint:
   - **Method**: `PATCH`
   - **Route**: `/auth/activate/:token`
   - **Router**: `authRouter` (`src/routers/auth.router.ts`)
   - **Controller**: `authController.activate` (`src/controllers/auth.controller.ts`)
   - **Service**: `authService.activate` (`src/services/auth.service.ts`)
4. On the backend, the token is verified via `tokenService.verifyToken(token, ActionTokenType.ACTIVATE)`, and the user is activated in the DB via `userService.updateUserById(userId, { isActive: true })`.

Email sending:
- Implemented in `emailService.sendEmail` (`src/services/email.service.ts`).
- Activation email subject/template is configured via `emailConstants[Email.ACTIVATE]` (`src/constants/email.constants.ts`).
- Template file: `src/templates/activate.hbs`.

## 🔁 Recovery Password Flow
To recover a password:
1. The user sends their email to the recovery request endpoint:
   - **Method**: `POST`
   - **Route**: `/auth/recovery`
   - **Router**: `authRouter` (`src/routers/auth.router.ts`)
   - **Controller**: `authController.recoveryPasswordRequest` (`src/controllers/auth.controller.ts`)
   - **Service**: `authService.recoveryPasswordRequest` (`src/services/auth.service.ts`)
   - **Validator**: `RecoveryValidator.emailSchema` (`src/validators/recovery.validator.ts`)
2. The service generates a recovery action token of type `ActionTokenType.RECOVERY` and sends a **recovery email**:
   - Email config: `emailConstants[Email.RECOVERY]` (`src/constants/email.constants.ts`)
   - Template file: `src/templates/recovery.hbs`
   - Frontend URL pattern: `${config.FRONTEND_URL}/recovery/:token`.
3. The recovery link should call the backend endpoint:
   - **Method**: `POST`
   - **Route**: `/auth/recovery/:token`
   - **Router**: `authRouter`
   - **Controller**: `authController.recoveryPassword`
   - **Service**: `authService.recoveryPassword`
   - **Validator**: `AuthValidator.validatePassword` (`src/validators/auth.validator.ts`)
4. On the backend, the token is verified via `tokenService.verifyToken(token, ActionTokenType.RECOVERY)`, the new password is hashed via `passwordService.hashPassword`, and the user’s password is updated using `userService.updateUserById`.

## 🔧 Configuration
To enable email sending, ensure the following variables are set in your `.env` file:
```env
# Gmail Example
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

> [!NOTE]
> For Gmail, you must use an "App Password" if 2FA is enabled.