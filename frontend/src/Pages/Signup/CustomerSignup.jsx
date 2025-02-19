
const CustomerSignup = () => {
    return (
        <div>
            <div>
                <h1>Customer Signup</h1>
                <form>
                    <div>
                        <label>Name</label><br/>
                        <input type="text" placeholder="Enter name" />
                    </div>
                    <div>
                        <label>Email</label><br/>
                        <input type="email" placeholder="Enter email" />
                    </div>
                    <div>
                        <label>Password</label><br/>
                        <input type="password" placeholder="Enter password" />
                    </div>
                    <div>
                        <label>Confirm Password</label><br/>
                        <input type="password" placeholder="Confirm password" />
                    </div>
                    <div>
                        <a href="/customerLogin">Already have an account?</a>
                    </div>
                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default CustomerSignup