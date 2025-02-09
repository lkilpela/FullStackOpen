const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const favorite = blogs.reduce((favorite, blog) => {
        return favorite.likes > blog.likes ? favorite : blog
    }, blogs[0])

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    // Count the number of blogs for each author
    const countBlogs = blogs.reduce((counts, blog) => {
        if (counts[blog.author]) {
            counts[blog.author]++
        } else {
            counts[blog.author] = 1
        }
        return counts
    }, {})

    // Find the author with the most blogs
    const author = Object.keys(countBlogs).reduce((currentAuthor, author) => {
        return countBlogs[author] > countBlogs[currentAuthor] ? author : currentAuthor
    })

    return {
        author: author,
        blogs: countBlogs[author]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const countLikes = blogs.reduce((counts, blog) => {
        if (counts[blog.author]) {
            counts[blog.author] += blog.likes
        } else {
            counts[blog.author] = blog.likes
        }
        return counts
    }, {})

    const author = Object.keys(countLikes).reduce((currentAuthor, author) => {
        return countLikes[author] > countLikes[currentAuthor] ? author : currentAuthor
    })
    return {
        author: author,
        likes: countLikes[author]
    }
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}