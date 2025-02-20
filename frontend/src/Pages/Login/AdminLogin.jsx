import { Link } from "react-router-dom"

const AdminLogin = () => {
  return (
    <div>
      <div>
        <h1>Admin Login</h1>
        <form>
          <div>
            <label>Email</label><br/>
            <input type="email" placeholder="Enter email" />
          </div>
          <div>
            <label>Password</label><br/>
            <input type="password" placeholder="Enter password" />
          </div>
          <Link to="/adminDashboard">
          <button type="submit">Login</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin