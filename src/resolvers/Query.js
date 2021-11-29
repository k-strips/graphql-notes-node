const getUser = async (parent, args, context, info) => {
    try {
        return await context.prisma.user.findUnique({where: {id: args.user.id}})
    } catch (error) {
        return error
    }
}

const listUsers = async (parent, args, context, info) => {
    try {
        return await context.prisma.user.findMany({where: args.filter, skip:args.skip, take:args.limit})
    } catch (error) {
        return error
    }
}

const getNote = async (parent, args, context, info) => {
    try {
        console.log("getNote")
    } catch (error) {
        return error
    }
}

const listNotes = async (parent, args, context, info) => {
    try {
        console.log("listNotes")
    } catch (error) {
        return error
    }
}

const getPage = async (parent, args, context, info) => {
    try {
        console.log("getPage")
    } catch (error) {
        return error
    }
}

const listPages = async (parent, args, context, info) => {
    try {
        console.log("listPages")
    } catch (error) {
        return error
    }
}

module.exports = {
    getUser,
    listUsers,
    getNote,
    listNotes,
    getPage,
    listPages,
}
