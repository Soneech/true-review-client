export default function getRatingStars(rating) {
    let starsElements = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsElements.push(<span class="Active-star"></span>);
        } else {
            starsElements.push(<span></span>);
        }
    }
    return starsElements;
}