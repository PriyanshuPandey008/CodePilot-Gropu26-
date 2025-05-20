const express=require('express');
const aiRoutes=require('./routes/ai.routes');
const cors=require('cors');
const authRoutes = require('./routes/auth.routes');
const commentRoutes = require('./routes/comment.routes');

const app=express();

app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
  res.send('Hello World!')

})

app.use('/ai',aiRoutes);
app.use('/api', authRoutes);
app.use('/api/comments', commentRoutes);

module.exports=app;