    import {Request, Response} from "express";
    import User from "../models/user";

   export const getUsers = async (req: Request, res: Response  )=>{


       const users = await User.findAll();
        res.json({
           users
        })
    }
    export const getUser = async (req: Request, res: Response  )=>{
        const {id} = req.params;
        const user = await User.findByPk(id);
        if(user){
            res.json({
                user,id
            })
        }else{
            res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });

        }

    }
    export const postUser = async (req: Request, res: Response  )=>{
        const {body} = req;
        try {
            if(!body.email ||!body.nombre){
                return res.status(400).json({
                    msg: `Nombre o Email no pueden ser nulos`
                });
            }
            const existeEmail = await User.findOne({
                where: {
                    email: body.email
                }
            });


            if(existeEmail){
                return res.status(400).json( 'Email debe ser Unico');
            }
            const user = User.build(body);
            await user.save();
            res.json(user)

        }catch (e) {
            console.log(e);
            res.status(500).json({
                msg: `Hable con el admin`
            })
        }

    }
    export const putUser = async (req: Request, res: Response  )=> {
       const {id} = req.params;
        const {body} = req;
        try {
            if(!body.email ||!body.nombre){
                return res.status(400).json({
                    msg: `Nombre o Email no pueden ser nulos`
                });
            }
            const existeEmail = await User.findOne({
                where: {
                    email: body.email
                }
            });

            if(existeEmail){
                return res.status(400).json( 'Email debe ser Unico');
            }
            const user = await User.findByPk(id)
            if(!user){
                return res.status(404).json({
                    msg: `No existe un usuario con el id: ${id}`
                });
            }
            await user.update(body);
            res.json(user)

        }catch (e) {
            console.log(e);
            res.status(500).json({
                msg: `Hable con el admin`
            })
        }
    }
    export const deleteUser = async (req: Request, res: Response  )=> {
        const {id} = req.params;
        const user = await User.findByPk(id)
        if(!user){
            return res.status(404).json({
                msg: `No existe un usuario con el id: ${id}`
            });
        }
        await user.update({estado : false});
        res.json(user)


    }