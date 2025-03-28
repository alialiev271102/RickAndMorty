export default interface ICharacter {
    id: number,
    image: string,
    name: string,
    status: string,
    species: string,
    location: {name: string}
}