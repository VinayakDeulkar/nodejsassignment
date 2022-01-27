const express=require('express')
const fs=require('fs')
const parse=require('querystring')
const PORT=8899;
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.get('/',(req,res)=>{
    const file=fs.readFileSync('Assigment.html',{root:'.'});
    const word=fs.readFileSync('EmployeeDetails.json')
    const data2=JSON.parse(word)
    res.write(file);
	for(let i=0;i<data2.length;i++){
        res.write(`
        <html>
        <head>
            <title>Assignment</title>
            <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossorigin="anonymous"
            />
        </head>
        <body>
            
               
            <Table >
                <tbody>
                  <tr>
                    <td width="300px">${data2[i].empId}</td>
                    <td width="300px"> ${data2[i].Name}</td>
                    <td width="300px">${data2[i].ContactNo}</td>
                    <td width="300px">${data2[i].email}</td>
                    <td width="300px">${data2[i].salary}</td>
                    <td width="300px"><a href="/deleteclick/${data2[i].empId}" class="btn btn-danger">Delete</a>
                    <a href="/updateclick/${data2[i].empId}" class="btn btn-warning">edit</a></td>
                  </tr>
                </tbody>
            </Table>
            </body>
    </html>
  `)
    }
    res.end();
})
app.get('/deleteclick/:id',(req,res)=>{
    let deleteid=req.params.id
    console.log(deleteid);
    const word=fs.readFileSync('EmployeeDetails.json')
    const data=JSON.parse(word)
    const finaldata=data.filter(item=>item.empId!==deleteid)
    const FinalData=JSON.stringify(finaldata)
    console.log(FinalData);
    fs.writeFile('EmployeeDetails.json',`${FinalData}`,(error)=>{
        if(error) throw error;
        res.writeHead(301,{Location:'/'})
        res.end();})
})
app.get('/updateclick/:id',(req,res)=>{
    let id=req.params.id
    console.log(id);
    const word=fs.readFileSync('EmployeeDetails.json')
    const data=JSON.parse(word)
    const finaldata=data.filter(item=>item.empId===id)
    console.log(finaldata);
    res.write(`<html>
    <head>
        <title>
            Assignment
        </title>
        <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
        />
    </head>
    <body>
        <div class="container">
            <div class="Row">
                <div class="col-lg-3"></div>
                <div class="col-lg-6">
                    <h3>Update Employee</h3>
                        <form method="post" action="/UpdateEmployee/${id}">
                            <div class="form-group">
                                <label class="form-label">Name</label>
                                <input type="text" class="form-control" value="${finaldata[0].Name}" name="Name"/>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Contact no</label>
                                <input type="text" class="form-control" value="${finaldata[0].ContactNo}" name="contactno"/>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="text" class="form-control" value="${finaldata[0].email}" name="email"/>
                            </div>
                            <div class="form-group">
                                <label class="form-label">employee id</label>
                                <input type="text" class="form-control" value="${finaldata[0].empId}" name="empid" />
                            </div>
                            <div class="form-group">
                                <label class="form-label">salary</label>
                                <input type="text" class="form-control" value="${finaldata[0].salary}" name="salary"/>
                            </div>
                            <div class="mt-3 text-center">
                                <button class="btn btn-success" type="submit">Submit</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    </body>
</html>`)
})
app.post('/UpdateEmployee/:id',(req,res)=>{
    let id=req.params.id
    console.log(id);
    let bodyData=''
    bodyData={empId:req.body.empid,Name:req.body.Name,ContactNo:req.body.contactno,email:req.body.email,salary:req.body.salary}
    const word=fs.readFileSync('EmployeeDetails.json')
    const data=JSON.parse(word)
    const finaldata=data.filter(item=>item.empId!==id)
    finaldata.push(bodyData)
    const FinalData=JSON.stringify(finaldata)
    fs.writeFile('EmployeeDetails.json',`${FinalData}`,(error)=>{
        if(error) throw error;
        res.writeHead(301,{Location:'/'})
        res.end();})
})
app.get('/AddEmployee',(req,res)=>{
    res.sendFile('form.html',{root:'.'});
})
app.post('/AddEmployee',(req,res)=>{
    let bodyData=''
    bodyData={empId:req.body.empid,Name:req.body.Name,ContactNo:req.body.contactno,email:req.body.email,salary:req.body.salary}

        const word=fs.readFileSync('EmployeeDetails.json')
        const data2=JSON.parse(word)
        data2.push(bodyData)
        const FinalData=JSON.stringify(data2)
        console.log(FinalData);
        fs.writeFile('EmployeeDetails.json',`${FinalData}`,(error)=>{
                if(error) throw error;
                res.writeHead(301,{Location:'/'})
                res.end();})
})
app.get('*',(req,res)=>{
    res.send('Invalid url')
})
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`);
})