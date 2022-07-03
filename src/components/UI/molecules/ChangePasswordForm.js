const ChangePasswordForm = ({ onSubmit, onChange, errors, values }) => (
  <div className="container">
    <div className="row">
      <div className="col-md-6 mt-5 mx-auto">
        <form noValidate onSubmit={onSubmit}>
          <h1 className="h3 mb-4 font-weight-normal">Change Password</h1>
          <div className="form-group mb-4">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              className={`form-control ${
                errors.newPassword ? "is-invalid" : ""
              }`}
              id="newPassword"
              name="newPassword"
              placeholder="New Password"
              value={values.newPassword}
              onChange={onChange}
            />
            {errors.newPassword && (
              <div className="invalid-feedback">{errors.newPassword}</div>
            )}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={onChange}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default ChangePasswordForm;
