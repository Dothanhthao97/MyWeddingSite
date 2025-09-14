var imageList_1 = [
    "20250529_064935000_iOS.webp",
    "20250529_081244000_iOS.webp",
    "20250529_081712480_iOS.webp",
    "20250529_082908490_iOS.webp",
    "20250529_083625270_iOS.webp",
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
    "20250612_233205950_iOS.webp",
    "20250612_233729120_iOS.webp",
    "20250612_233928860_iOS.webp",
    "20250612_234130880_iOS.webp",
    "20250612_234401000_iOS.webp",
    "20250612_234731890_iOS.webp",
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
    "20250613_012757730_iOS.webp",
    "20250613_012910430_iOS.webp",
    "20250613_013141160_iOS.webp",
    "20250613_013507690_iOS.webp",
    "20250613_013639500_iOS.webp",
    "20250613_014145880_iOS.webp",
    "20250613_014452250_iOS.webp"
];

var imageList_2 = [
  "20250622_024227820_iOS.webp",
  "20250622_024355490_iOS.webp",
  "20250622_024546760_iOS.webp",
  "20250622_024730270_iOS.webp",
  "20250622_024937880_iOS.webp",
  "20250622_025831460_iOS.webp",
  "20250622_025850350_iOS.webp",
  "20250622_030153220_iOS.webp",
  "20250622_030207670_iOS.webp",
  "20250622_030302210_iOS.webp",
  "20250622_030331630_iOS.webp",
  "20250622_030350270_iOS.webp",
  "20250622_030527420_iOS.webp",
  "20250622_031141650_iOS.webp",
  "20250622_031546730_iOS.webp",
  "20250622_031816960_iOS.webp"
];

var imageList_4 = [
  "20250622_041349520_iOS.webp",
  "20250622_041539550_iOS.webp",
  "20250622_041633350_iOS.webp",
  "20250622_041933400_iOS.webp",
  "20250622_041940350_iOS.webp",
  "20250622_042019090_iOS.webp",
  "20250622_042048210_iOS.webp",
  "20250622_042224180_iOS.webp",
  "20250622_042445990_iOS.webp",
  "20250622_042602110_iOS.webp"
];


var imageList_3 = [
  "20250622_051058720_iOS.webp",
  "20250622_051114490_iOS.webp",
  "20250622_051243630_iOS.webp",
  "20250622_051313970_iOS.webp",
  "20250622_051433990_iOS.webp",
  "20250622_051602220_iOS.webp",
  "20250622_052010420_iOS.webp",
  "20250622_052259930_iOS.webp",
  "20250622_052441590_iOS.webp",
  "20250622_053056940_iOS.webp",
  "20250622_053209650_iOS.webp"
];


// Số ảnh mỗi lần load
const PAGE_SIZE = 200;

// Lưu trạng thái số ảnh đã load cho từng gallery
const loadedCount = {
    'lightgallery_1': 0,
    'lightgallery_2': 0,
    'lightgallery_3': 0,
    'lightgallery_4': 0
};

// Danh sách gallery và folder tương ứng
const galleries = [
    { id: 'lightgallery_1', folder: 'Dream', imageList: imageList_1 },
    { id: 'lightgallery_2', folder: 'Studio', imageList: imageList_2 },
    { id: 'lightgallery_3', folder: 'HyPhuc', imageList: imageList_3 },
    { id: 'lightgallery_4', folder: 'VietPhuc', imageList: imageList_4 }
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
            // Lưu instance LightGallery để refresh sau này
            $container[0].lgInstance = lightGallery($container[0], {
                selector: 'a',
                plugins: [lgThumbnail], // Thêm lgZoom vào đây
            });
        } else {
            // Nếu load thêm thì chỉ gọi layout lại
            if (masonryInstances[eleGallery]) {
                masonryInstances[eleGallery].reloadItems();
                masonryInstances[eleGallery].layout();
            }

            // Refresh LightGallery để nhận ảnh mới
            if ($container[0].lgInstance) {
                $container[0].lgInstance.refresh();
            }
        }
    });
}

$(function () {
    // Khởi tạo mỗi gallery với 10 ảnh đầu
    galleries.forEach(g => {
        RenderGallery(g.id, g.imageList, g.folder, 0, PAGE_SIZE);
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
