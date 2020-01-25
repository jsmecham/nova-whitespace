//
// Whitespace Extension for Nova
// Extensions/Range.js
//
// Copyright © 2020 Justin Mecham. All rights reserved.
//

if (typeof Range.prototype.length === "undefined") {
    Object.defineProperty(Range.prototype, "length", {
        get() {
            return this.end - this.start;
        }
    });
}
