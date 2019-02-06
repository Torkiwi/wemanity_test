export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            //Special Case Legendary
            //- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
            if (item.name == 'Sulfuras, Hand of Ragnaros') {
                continue;
            }

            //- All items have a SellIn value which denotes the number of days we have to sell the item
            switch (item.name) {
                
                //- "Aged Brie" actually increases in Quality the older it gets
                case 'Aged Brie':
                    item.quality++;
                    break;

                //- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
                case 'Backstage passes to a TAFKAL80ETC concert':
                    if (item.sellIn <= 0) {
                        //Quality drops to 0 after the concert
                        item.quality = 0;
                    } else {
                        //Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less
                        var inc = 1;
                        if (item.sellIn <= 10) {
                            inc = 2;
                        }
                        if (item.sellIn <= 5) {
                            inc = 3;
                        }
                        item.quality += inc;
                    }
                    break;

                default:
                    //- At the end of each day our system lowers quality for every item
                    var dec = 1;
                    if (item.name.indexOf('Conjured') != -1) {
                        //- "Conjured" items degrade in Quality twice as fast as normal items
                        dec = 2;
                    }
                    if (item.sellIn <= 0) {
                        //- Once the sell by date has passed, Quality degrades twice as fast
                        dec = dec * 2;
                    }
                    item.quality -= dec;
                    break;
            }
            item.sellIn--;
            //- The Quality of an item is never negative
            //- The Quality of an item is never more than 50
            item.quality = Math.max(0, Math.min(50, item.quality));
        }
        return this.items;
    }
}