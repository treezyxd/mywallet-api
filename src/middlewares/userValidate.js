const userValidate = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {abortEarly: false});

    if(error) {
      const errorMessages = error.details.map(errdetail => errdetail.message);
      console.log(errorMessages);
      return res.status(422).send(errorMessages);
    }
    next();
  }
}

export default userValidate;