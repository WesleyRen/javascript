// utilities to permute string or array of strings.
const mockData: Person[] = [
    {
        "userId": "id01",
        "userFullName": "Bruce test",
        "title": "Senior Manager - Engineering",
        email: ""
    },
    {
        "userId": "id02",
        "userFullName": "ATest BTest",
        "title": "Sr Mgr II Process",
        email: ""
    },
    {
        "userId": "id03",
        "userFullName": "Aisha TestSon",
        "title": "SpecialistContactCenterOps",
        email: ""
    },
    {
        "userId": "id04",
        "userFullName": "Jax John - test company",
        "title": "Worker",
        email: ""
    }
];

const searchAbleFullNames = mockData.map(person => person.userFullName);
const allPermutesOfFullNames = permuteStrings(searchAbleFullNames);


function permuteAString(inputString: string) : string[]|string {
    if (inputString.length < 2) return [inputString]; // This is our break condition

    let permutations: string[] = [];

    for (let i = 0; i < inputString.length; i++) {
        for (let j = i + 1; j < inputString.length + 1; j++) {
            permutations.push(inputString.slice(i,j).toLowerCase());
        }
    }

    return removeDups(permutations);
}

function permuteStrings(inputStrings: string[]) : string[] {
    let permutations: string[] = [];
    inputStrings.forEach(str => {
        permutations = permutations.concat(permuteAString(str))
    });
    return removeDups(permutations);
}

function removeDups(strings: string[]) : string[] {
    let unique = new Set();
    strings.forEach(function(str: string) {
        if(!unique.has(str)) {
            unique.add(str);
        }
    });
    // @ts-ignore
    return Array.from(unique.values());
}
