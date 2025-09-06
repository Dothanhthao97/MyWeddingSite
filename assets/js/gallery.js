var imageList = [
    "20250529_063753000_iOS.webp",
    "20250529_063815460_iOS.webp",
    "20250529_064010120_iOS.webp",
    "20250529_064935000_iOS.webp",
    "20250529_065011050_iOS.webp",
    "20250529_065835630_iOS.webp",
    "20250529_065838370_iOS.webp",
    "20250529_070142470_iOS.webp",
    "20250529_081244000_iOS.webp",
    "20250529_081622370_iOS.webp",
    "20250529_081712480_iOS.webp",
    "20250529_082837370_iOS.webp",
    "20250529_082903820_iOS.webp",
    "20250529_082908490_iOS.webp",
    "20250529_083223300_iOS.webp",
    "20250529_083625270_iOS.webp",
    "20250529_083856410_iOS.webp",
    "20250529_084000760_iOS.webp",
    "20250529_084123280_iOS.webp",
    "20250529_084328280_iOS.webp",
    "20250612_223930620_iOS.webp",
    "20250612_224433790_iOS.webp",
    "20250612_225056700_iOS.webp",
    "20250612_225148000_iOS.webp",
    "20250612_225227100_iOS.webp",
    "20250612_232312830_iOS.webp",
    "20250612_232739620_iOS.webp",
    "20250612_232953540_iOS.webp",
    "20250612_233729120_iOS.webp",
    "20250612_234130880_iOS.webp",
    "20250612_234401000_iOS.webp",
    "20250612_234548570_iOS.webp",
    "20250612_234731890_iOS.webp",
    "20250612_235642920_iOS.webp",
    "20250612_235924180_iOS.webp",
    "20250613_000123320_iOS.webp",
    "20250613_000404000_iOS.webp",
    "20250613_000424340_iOS.webp",
    "20250613_001903760_iOS.webp",
    "20250613_001957220_iOS.webp",
    "20250613_002408320_iOS.webp",
    "20250613_002628790_iOS.webp",
    "20250613_002704190_iOS.webp",
    "20250613_012053000_iOS.webp",
    "20250613_012140560_iOS.webp",
    "20250613_012612170_iOS.webp",
    "20250613_012748920_iOS.webp",
    "20250613_012757730_iOS.webp",
    "20250613_012910430_iOS.webp",
    "20250613_013118000_iOS.webp",
    "20250613_013141160_iOS.webp",
    "20250613_013507690_iOS.webp",
    "20250613_013639500_iOS.webp",
    "20250613_014145880_iOS.webp",
    "20250613_014413110_iOS.webp",
    "20250613_014452250_iOS.webp",
    "20250613_014727470_iOS.webp",
    "20250702_153347847_iOS.webp",
    "20250715_170719835_iOS.webp",
    "20250715_171518116_iOS.webp",
    "20250716_165138982_iOS.webp",
    "20250716_170507183_iOS.webp",
    "20250717_053503068_iOS.webp",
    "20250717_143805151_iOS.webp",
    "20250717_144907413_iOS.webp",
    "20250717_145937718_iOS.webp",
    "20250717_150539534_iOS.webp",
    "20250717_162759714_iOS.webp",
    "20250717_163733527_iOS.webp",
    "20250718_053222873_iOS.webp",
    "20250718_053857754_iOS.webp",
    "20250718_054149029_iOS.webp",
    "20250718_084748614_iOS.webp",
    "20250718_085130152_iOS.webp",
    "20250718_173008413_iOS.webp",
    "20250719_020956121_iOS.webp",
    "20250719_052747071_iOS.webp",
    "20250719_064047236_iOS.webp",
    "20250720_043632037_iOS.webp",
    "20250720_044951169_iOS.webp",
    "20250721_181734742_iOS.webp",
    "20250723_053848799_iOS.webp",
    "20250724_053224267_iOS.webp",
    "20250725_165221389_iOS.webp",
    "20250727_060213329_iOS.webp",
    "20250727_063519956_iOS.webp"
];

// Số ảnh mỗi lần load
const PAGE_SIZE = 10;

// Lưu trạng thái số ảnh đã load cho từng gallery
const loadedCount = {
    'lightgallery_1': 0,
    'lightgallery_2': 0,
    'lightgallery_3': 0,
    'lightgallery_4': 0
};

// Danh sách gallery và folder tương ứng
const galleries = [
    { id: 'lightgallery_1', folder: 'Dream' },
    { id: 'lightgallery_2', folder: 'Studio' },
    { id: 'lightgallery_3', folder: 'VietPhuc' },
    { id: 'lightgallery_4', folder: 'HyPhuc' }
];

// Lưu instance Masonry cho từng gallery
const masonryInstances = {};

function RenderGallery(eleGallery, imageList, folderName, start = 0, count = PAGE_SIZE) {
    const $container = $('#' + eleGallery);

    // Nếu là lần đầu thì clear, nếu load thêm thì không
    if (start === 0) $container.empty();

    // Lấy danh sách ảnh cần render
    const imagesToShow = imageList.slice(start, start + count);
    imagesToShow.forEach(file => {
        const imgPath = `assets/images/Gallery/${folderName}/${file}`;
        $container.append(`
            <div class="col-lg-3 col-sm-6 item-gallery wow fadeIn">
                <a href="${imgPath}" class="d-block h-100">
                    <img class="img-fluid rounded" src="${imgPath}" alt="" loading="lazy">
                </a>
            </div>
        `);
    });

    imagesLoaded($container[0], function () {
        // Nếu là lần đầu, khởi tạo Masonry và LightGallery
        if (start === 0) {
            masonryInstances[eleGallery] = new Masonry($container[0], {
                itemSelector: '.col-lg-3',
                percentPosition: true
            });
            lightGallery($container[0], {
                selector: 'a',
                plugins: [lgZoom, lgThumbnail],
            });
        } else {
            // Nếu load thêm thì chỉ gọi layout lại
            if (masonryInstances[eleGallery]) {
                masonryInstances[eleGallery].reloadItems();
                masonryInstances[eleGallery].layout();
            }
        }
    });
}

$(function () {
    // Khởi tạo mỗi gallery với 10 ảnh đầu
    galleries.forEach(g => {
        RenderGallery(g.id, imageList, g.folder, 0, PAGE_SIZE);
        loadedCount[g.id] = PAGE_SIZE;
    });

    // Lắng nghe sự kiện scroll để load thêm ảnh (chỉ load 1 gallery mỗi lần scroll)
    $(window).on('scroll', function () {
        for (let i = 0; i < galleries.length; i++) {
            const g = galleries[i];
            const $gallery = $('#' + g.id);
            if (!$gallery.length) continue;

            const galleryBottom = $gallery.offset().top + $gallery.height();
            const windowBottom = $(window).scrollTop() + $(window).height();

            if (
                windowBottom > galleryBottom - 200 &&
                loadedCount[g.id] < imageList.length &&
                windowBottom > $gallery.offset().top
            ) {
                RenderGallery(g.id, imageList, g.folder, loadedCount[g.id], PAGE_SIZE);
                loadedCount[g.id] += PAGE_SIZE;
                break; // Chỉ load thêm cho 1 gallery mỗi lần scroll
            }
        }
    });
});
