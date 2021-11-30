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

        const token = jwt.sign({userId: user[0].id}, SECRET_KEY)

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
        const {id} = context.args
        let notes = context.prisma.note.deleteMany({
            where: {userId: id}
        });

        let address = context.prisma.address.delete({
            where: {userId: id}
        });

        const transaction = context.prisma.$transaction([notes, address])
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
        const {id} = args.note;
        let deletePages = context.prisma.page.deleteMany({where: {noteId: id}});
        let note = context.prisma.note.delete({where: {id}})

        return await context.prisma.$transaction([deletePages, note])
    } catch (error) {
        return error
    }
}

const addPage = async (parent, args, context, info) => {
    try {
        const {title, body, noteId} = args.page;
        return await context.prisma.page.create({
            data: {
                title,
                body,
                note: {
                    connect: {
                        id: noteId
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
        const {id, title, body} = args.page;
        return await context.prisma.page.update({
            where: {
                id
            },
            data: {
                title,
                body
            }
        })
    } catch (error) {
        return error
    }
}

const deletePage = async (parent, args, context, info) => {
    try {
        return await context.prisma.page.delete({
            where: {id: args.page.id}
        })
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

