import sharp from "sharp";

export default async function ResizeImg(image:Buffer) {

/**
 * input : Image file from form data
 * output : Buffer stream
 */
    return await sharp(image).resize({
        width:256,
        height:256
    }).toBuffer();

}