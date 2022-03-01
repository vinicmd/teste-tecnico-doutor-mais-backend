import express, { json, Request, Response } from 'express'
import cors from 'cors'


interface DataProps {
  idcurso: number
  ds_titulo: string
  ds_descricao: string
}

const data: DataProps[] = []

const app = express()

app.use(json())
app.use(cors())


app.get('/curso', (request: Request, response: Response) => {
  return response.status(200).send(data)
})

app.get('/curso/:id', (request: Request, response: Response) => {
  const { id } = request.params
  const course = data.find((course) => course.idcurso === Number(id))
  if(!course) {
    return response.status(404).send({messagem: 'Curso não encontrado.'})
  }
  return response.status(200).json(course)
})

app.post('/curso', (request: Request, response: Response) => {
  const { idcurso, ds_titulo, ds_descricao } = request.body

  const newCourse = {
    idcurso, 
    ds_titulo,
    ds_descricao
  }

  data.push(newCourse)

  return response.status(201).json(data)
})

app.put('/curso/:id', (request: Request, response: Response) => {
  const { idcurso, ds_titulo, ds_descricao } = request.body
  const { id } = request.params
  const index = data.findIndex((course) => course.idcurso === Number(id))
  
  data[index].idcurso = idcurso
  data[index].ds_titulo = ds_titulo
  data[index].ds_descricao = ds_descricao

  return response.status(200).json(data[index])
})

app.delete('/curso/:id', (request: Request, response: Response) => {
  const { id } = request.params
  const index = data.findIndex((course) => course.idcurso === Number(id))

  data.splice(index, 1)
  console.log(data)
  return response.status(200).send()
})

app.listen(3333)