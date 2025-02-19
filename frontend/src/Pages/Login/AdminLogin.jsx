
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin