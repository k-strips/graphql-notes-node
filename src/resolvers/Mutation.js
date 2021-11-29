const { UserInputError } = require('apollo-server-core');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (parent, args, context, info) => {
    try {
        const {address} = args.input
        let salt = bcrypt.genSaltSync(10)
        let password = bcrypt.hashSync(args.input.password, salt);
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
        const user = await context.prisma.user.findUnique({
            where: {
                OR: [
                        {
                            address:{
                                email: {equals: args.input?.email}
                            } 
                        },
                        {
                            userName: {equals: args.input?.nameName}
                        }
                    ]
            }
        });

        if(!user){
            if(args.input.userName) {
                throw new Error(`username ${args.input.userName} does not exist`)
            }

            if(args.input.email) {
                throw new Error(`email ${args.input.email} could not be found`)
            }
            // throw new Error(`no such user exists`)

        }

        const validPassword = await bcrypt.compare(args.input.password, user.password);

        if(!validPassword) {
            throw new Error(`password not valid`)
        }

        const token = jwt.sign({userId: user.id}, SECRET_KEY)

        return {
            token,
            user
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
        console.log("signup")
    } catch (error) {
        return error
    }
}

const createNote = async (parent, args, context, info) => {
    try {
        const note = await context.prisma.note.create({
            data: {
                ...args.input,
                owner: {
                    create: {
                        id: ""
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
        console.log("updateNote")
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
        console.log("addPage")
    } catch (error) {
        return error
    }
}

const editPage = async (parent, args, context, info) => {
    try {
        console.log("editPage")
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

