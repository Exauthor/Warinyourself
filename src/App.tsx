import { h, onMounted, ref } from "vue";

export default {
  setup() {
    const scene = ref<any>(null);
    const height = ref(0);
    const width = ref(0);
    const titles = [
      {
        text: "my",
        video: "lightning",
        offsetY: 0.87,
        style: {
          fontSize: "1em"
        },
        videoStyle: {
          width: "4ch"
        }
      },
      {
        text: "world",
        video: "rocket",
        offsetY: 0.67,
        style: {
          fontSize: "0.85em"
        },
        videoStyle: {
          width: "9ch"
        }
      },
      {
        text: "is",
        video: "smokeOut",
        offsetY: 1,
        style: {
          fontSize: "1em"
        },
        videoStyle: {
          width: "3ch",
          top: "0",
          left: "0px"
        }
      },
      {
        text: "stress",
        video: "nuclearBomb",
        offsetY: 0.71,
        style: {
          fontSize: "0.85em"
        },
        videoStyle: {
          width: "7ch",
          top: "-0.125em"
        }
      },
      {
        text: "pain",
        video: "eruption",
        offsetY: 0.8,
        style: {
          fontSize: "1em"
        },
        videoStyle: {
          width: "5.1ch",
          top: "0.14em"
        }
      },
      {
        text: "hunger",
        video: "tiger",
        offsetY: 0.7,
        style: {
          fontSize: "0.85em"
        },
        videoStyle: {
          width: "7.5ch",
          top: "0.13em"
        }
      },
      {
        text: "i am",
        video: "tornado",
        offsetY: 0.78,
        style: {
          fontSize: "0.92em"
        },
        videoStyle: {
          width: "5ch",
          top: "-0.35em"
        }
      },
      {
        text: "warinyourself",
        video: "eruptionTimelapse",
        offsetY: 0.63,
        style: {
          fontSize: "0.5em"
        },
        videoStyle: {
          width: "10ch",
          top: "0.11em"
        }
      }
    ];
    const activeTitle = ref(titles[0]);

    onMounted(() => {
      if (scene.value != null) {
        const bound = scene.value.getBoundingClientRect();
        [height.value, width.value] = [bound.height, bound.width];
        console.log({ height: height.value })

        window.addEventListener("resize", () => {
          setTimeout(() => {
            const bound = scene.value.getBoundingClientRect();
            [height.value, width.value] = [bound.height, bound.width];
          }, 100);
        });

        const updateTitle = () =>
          setTimeout(() => {
            let index = titles.findIndex(
              title => title.text === activeTitle.value.text
            );
            if (index === undefined) return;

            const isLast = index === titles.length - 1;

            if (!isLast) {
              activeTitle.value = titles[++index];

              setTimeout(() => {
                const bound = scene.value.getBoundingClientRect();
                [height.value, width.value] = [bound?.height, bound.width];

                console.log({ height: height.value, width: width.value });
              });

              updateTitle();
            }
          }, 2000);

        updateTitle();
      }
    });

    return () => <div class="home">
      <div class="title" key={activeTitle.value.video} ref={scene}>
        <video
          class="title-video"
          autoplay
          loop
          muted
          style={activeTitle.value.videoStyle || {}}
        >
          <source
            src={require(`./assets/${activeTitle.value.video}.mp4`)}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <svg
          viewBox={`0 0 ${width.value} ${height.value}`}
          class="svg-title"
          xmlns="http://www.w3.org/2000/svg"

        >
          <defs>
            <clipPath id="cut-off-bottom">
              <text
                y={height.value * (activeTitle.value.offsetY || 0.65)}
                class="title-text"
                fill="white"
              >
                <tspan text-anchor="middle" style={activeTitle.value.style}>
                  { activeTitle.value.text }
                </tspan>
              </text>
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  },
};