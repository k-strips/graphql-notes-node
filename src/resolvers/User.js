const address = (parent, args, context, info) => {
    return context.prisma.user.findUnique({where: {id: parent.id}}).address()
}

const notes = (parent, args, context, info) => {
    return context.prisma.user.findUnique({where: {id: parent.id}}).notes()
}

module.exports = {
    address,
    notes
}