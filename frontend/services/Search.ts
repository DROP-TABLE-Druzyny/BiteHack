import { wellKnownDomains } from "@/data/well-known-domains";

// Represents an item in the search engine.
export interface SearchItem
{
    // The title of the search item.
    title: string;

    // A brief description of the search item.
    desc: string;

    // The URL associated with the search item.
    url: string;

    categories: string[];
}

export function FetchDomains(query: string)
{
    query = query.toLowerCase(); // Normalize query to lower case for case-insensitive matching

    let results: SearchItem[] = [];
    let resultsByKeyword: SearchItem[] = [];

    wellKnownDomains.forEach(element => {
        console.log("Doing element" + element.title)
        if (element.title.toLowerCase().includes(query))
        {
            results.push(element);
        }
        else
        {
            // Search keywords
            for (const keyword of element.categories) {
                if (keyword.toLowerCase().includes(query)) {
                    resultsByKeyword.push(element);
                    break;
                }
            }
        }
    });

    return results.concat(resultsByKeyword);
}