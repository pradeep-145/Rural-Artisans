import React from 'react'

const LoginSplit = () => {
  return (
    <div>
        <div>
            <h1>For BUSINESS</h1>
            <p>Become a seller</p>
            <a href="/artisanLogin">Login</a>
            <p>Don't have an account?</p>
            <a href="/artisanSignup">Sign Up </a>
        </div>

        <div>
            <h1>For CUSTOMERS</h1>
            <p>Explore all our artisan's products</p>
            <a href="/customerLogin">Login</a>
            <p>Don't have an account?</p>
            <a href="/customerSignup">Sign Up </a>
        </div>
    </div>
  )
}

export default LoginSplit