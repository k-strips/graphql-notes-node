const { UserInputError } = require('apollo-server-core');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (parent, args, context, info) => {
    try {
        const {address} = args.input
        // let salt = bcrypt.genSaltSync(10)
        let password = await bcrypt.hash(args.input.password, 10);
        const user = await context.prisma.user.create(
            {
                data: {
                    ...args.input,
                    address: {
                        create: {
                            ...address
                        }
                    }, 
                    password
                }
            }
        );
        const token = jwt.sign({userId: user.id}, SECRET_KEY)
        return {
            token,
            user
        }
    } catch (error) {
        return error
    }
}

const login = async (parent, args, context, info) => {
    try {
        const user = await context.prisma.user.findMany({
            where: {
                OR: [
                        {
                            address:{
                                email: {equals: args.input?.email}
                            } 
                        },
                        {
                            userName: {equals: args.input?.userName}
                        }
                    ]
            }
        });

        if(!user && !user[0]){
            if(args.input.userName) {
                throw new Error(`username ${args.input.userName} does not exist`)
            }

            if(args.input.email) {
                throw new Error(`email ${args.input.email} could not be found`)
            }
            // throw new Error(`no such user exists`)

        }

        const validPassword = await bcrypt.compare(args.input.password, user[0]?.password);

        if(!validPassword) {
            throw new Error(`password not valid`)
        }

        const token = jwt.sign({userId: user.id}, SECRET_KEY)

        return {
            token,
            user: user[0]
        }


    } catch (error) {
        return error
    }
}

const updateUser = async (parent, args, context, info) => {
    try {

        return await context.prisma.user.update({
            where: {id: args.input.id},
            data: {
                ...args.input,
                address: {
                    update: {
                        ...args.input.address
                    }
                }
            }
        })
    } catch (error) {
        return error
    }
}

const deleteUser = async (parent, args, context, info) => {
    try {
        let notes = await context.prisma.note.delete({
            where: {userId: ""}
        });

        let address = await context.prisma.address.delete({
            where: {userId: ""}
        });
    } catch (error) {
        return error
    }
}

const createNote = async (parent, args, context, info) => {
    const {title} = args.note;
    try {
        return await context.prisma.note.create({
            data: {
                title,
                user: {
                    connect: {
                        id: "a4cef2be-8578-4a10-9db7-114ae1ef2fa9"
                    }
                }
            }
        })
    } catch (error) {
        return error
    }
}

const updateNote = async (parent, args, context, info) => {
    try {
        return await context.prisma.note.update({
            where: {id: args.note.id},
            data: {
                ...args.note
            }
        })
    } catch (error) {
        return error
    }
}

const deleteNote = async (parent, args, context, info) => {
    try {
        console.log("deleteNote")
    } catch (error) {
        return error
    }
}

const addPage = async (parent, args, context, info) => {
    try {
        const {title, body} = args.note;
        return await context.prisma.page.create({
            data: {
                title,
                body,
                note: {
                    connect: {
                        id: "98bcab47-3f8b-4c6b-b4da-0aec082ea057"
                    }
                }
            }
        })
    } catch (error) {
        return error
    }
}

const editPage = async (parent, args, context, info) => {
    try {
        return await context.prisma.page.update({
            where: {id: args.page.id},
            data: {
                ...args.page
            }
        })
    } catch (error) {
        return error
    }
}

const deletePage = async (parent, args, context, info) => {
    try {
        console.log("deletePage")
    } catch (error) {
        return error
    }
}

module.exports =  {
    signup,
    login,
    updateUser,
    deleteUser,
    createNote,
    updateNote,
    deleteNote,
    addPage,
    editPage,
    deletePage,
}

