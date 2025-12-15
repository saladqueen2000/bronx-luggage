<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Admin Login</title>
</head>
<body>
    <h2>Admin Login</h2>

    <form method="POST" action="{{ route('admin.login.submit') }}">
        @csrf

        <div>
            <label>Email</label>
            <input type="email" name="email">
        </div>

        <div>
            <label>Password</label>
            <input type="password" name="password">
        </div>

        <button type="submit">Login</button>
    </form>
</body>
</html>
