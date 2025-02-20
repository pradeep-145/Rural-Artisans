import {Link} from 'react-router-dom'

const CustomerLogin = () => {
    return (
        <div>
            <div>
                <h1>Customer Login</h1>
                <form>
                    <div>
                        <label>Email</label><br/>
                        <input type="email" placeholder="Enter email" />
                    </div>
                    <div>
                        <label>Password</label><br/>
                        <input type="password" placeholder="Enter password" />
                    </div>
                    <div>
                        <a href="/customerSignup">Don't have an account?</a>
                    </div>
                    <Link to="/">
                    <button type="submit">Login</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default CustomerLogin