<template>
    <div>
        <FRNCiHeader></FRNCiHeader>
        <router-view></router-view>
        <FRNCiFooter></FRNCiFooter>
    </div>
</template>
<script>
import FRNCiHeader from './Header';
import FRNCiFooter from './Footer';

export default {
    components: {
        FRNCiHeader,
        FRNCiFooter,
    },
};
</script>

<style lang="scss">
@mixin alert-invite {
    .ajs-modal.ajs-invite {
        .ajs-header {
            display: none;
        }
        .ajs-body {
            text-align: center;
            font-weight: bold;
            line-height: 1.2;
            font-size: 1.5rem;
            p {
                margin-bottom: 1rem;
            }

            textarea {
                width: 100%;
                font-size: 16px;
                letter-spacing: 1px;
                margin-bottom: 1.5rem;
                padding: 0.375rem 0.75rem;
                line-height: 1.5;
                color: #495057;
                border: 1px solid #ced4da;
                border-radius: 0.25rem;
            }
        }
        .ajs-footer {
            border: none;
            background-color: white;
            width: 100%;
            padding: 0 .75rem;
            margin: 0;

            .ajs-ok {
                border: 2px solid #f8b62c;
                background-color: #f8b62c;
                border-radius: .25rem;
                padding: 4px 20px;
                color: white;
                letter-spacing: 1px;
                cursor: pointer;
            }

            .ajs-cancel {
                border: 2px solid #f8b62c;
                background-color: transparent;
                border-radius: .25rem;
                padding: 4px 20px;
                color: #f8b62c;
                letter-spacing: 1px;
                cursor: pointer;
            }
        }
    }
}

@mixin alert-cancel {
    .ajs-modal.ajs-cancel, .ajs-modal.ajs-reject {
        .ajs-commands {
            margin: -14px 24px 0 0;
        }
        .ajs-header {
            display: none;
        }
        .ajs-body {
            position: relative;
            width: 100%;
            min-height: auto;
            .ajs-content {
                position: relative;
                top: 0;
                left: 0;
                padding: 16px;
            }
        }
        .ajs-footer {
            width: 100%;
            position: relative;
            border: none;
            background-color: white;
            padding: 0 .75rem;
            margin: auto;
            .ajs-buttons {
                text-align: center;
                white-space: unset;
                font-weight: 400;
                .ajs-ok {
                    margin: 5% 0;
                    border: 2px solid #60bc90;
                    background-color: #60bc90;
                    border-radius: .25rem;
                    padding: 4px 20px;
                    color: white;
                    letter-spacing: 1px;
                    cursor: pointer;
                }

                .ajs-cancel {
                    margin: 5% 4px;
                    border: 2px solid #60bc90;
                    background-color: transparent;
                    border-radius: .25rem;
                    padding: 4px 20px;
                    color: #60bc90;
                    letter-spacing: 1px;
                    cursor: pointer;
                }
            }
        }
    }
}

body {
    font-family: "Microsoft JhengHei", PMingLiU, MingLiu, "Segoe UI", "Helvetica", Garuda, Arial, sans-serif;

    .md-button {
        text-transform: none;
    }

    .alertify {
        .ajs-modal .ajs-dialog {
            padding: 40px;
            max-width: 50%;
            width: 50%;
            border: 1px solid #b5b2b2;
            border-radius: 40px;
        }
        @include alert-invite();
        @include alert-cancel();
    }
    
}
</style>