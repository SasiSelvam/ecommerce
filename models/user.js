var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

//abc123 -> 123123aqweqeqe133qweqwe;
/* The user schema attributes/characteristics / fields */
var UserSchema = new mongoose.Schema({
  email : {type : String, unique: true, lowercase: true},
  password: String,
  profile:{
    name : {  type : String,  default:'' },
    picture: {  type : String,default:'' }
  },
    address : String,
    history :[{
      date : Date,
      paid : {  type: Number, default: 0},
      //item:{  type : Schema.Types.ObjectId,ref: ''}
    }]
});

/* Hash the password before we even save it to the database */
// var user = new User();
// var user1 = new User();
UserSchema.pre('save',function(next){
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10,function(err,salt){
    if(err) return next(err);
    //user.password = 123
    bcrypt.hash(user.password,salt,null,function(err,hash){
      if(err) return next(err);
      //hash = 123bas
      user.password = hash;
      next();
    });
  });
});

/*compare password in the database and the one that the user type in*/
UserSchema.methods.comparePasssword = function(password){
  return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User',UserSchema);
